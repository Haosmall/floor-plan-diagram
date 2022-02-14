const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const path = require("path");
require("dotenv").config({
	path: path.join(path.resolve(), ".env"),
});

const BucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketPath = process.env.AWS_NAME_PATH;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

const FILE_SIZE = parseInt(process.env.MAX_IMAGE_UPLOAD_SIZE);

class AwsS3Service {
	async uploadFile(file, bucketName = BucketName) {
		const fileStream = fs.readFileSync(file.path);

		const uploadParams = {
			Bucket: bucketName,
			Body: fileStream,
			Key: `${bucketPath}/${Date.now()}-${file.originalname}`,
		};

		const { mimetype } = file;
		if (
			mimetype === "image/jpeg" ||
			mimetype === "image/png" ||
			mimetype === "image/gif" ||
			mimetype === "video/mp3" ||
			mimetype === "video/mp4"
		)
			uploadParams.ContentType = mimetype;

		try {
			const { Location } = await s3.upload(uploadParams).promise();

			return Location;
		} catch (err) {
			console.log("err: ", err);
			throw new Error("Upload file Aws S3 failed");
		}
	}

	async deleteFile(url, bucketName = BucketName) {
		const urlSplit = url.split("/");
		const key = urlSplit[urlSplit.length - 1];

		const params = {
			Bucket: bucketName,
			Key: key,
		};

		try {
			await s3.deleteObject(params).promise();
		} catch (err) {
			throw new Error("Delete file Aws S3 failed");
		}
	}
}

module.exports = new AwsS3Service();
