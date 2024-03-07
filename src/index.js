// serverless-image-processing-toolkit.js

const AWS = require('aws-sdk');
const sharp = require('sharp');

// Initialize AWS SDK
AWS.config.update({ region: 'eu-west-3' });
const lambda = new AWS.Lambda();

// Define the image processing function
async function processImage(event) {
  try {
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const dstBucket = `${srcBucket}-processed`;
    const dstKey = `processed/${srcKey}`;

    // Download the image from S3
    const s3 = new AWS.S3();
    const { Body } = await s3.getObject({ Bucket: srcBucket, Key: srcKey }).promise();

    // Process the image using sharp
    const processedImage = await sharp(Body)
      .resize(800) // Resize the image to a maximum width of 800 pixels
      .toBuffer();

    // Upload the processed image to S3
    await s3.putObject({ Bucket: dstBucket, Key: dstKey, Body: processedImage }).promise();

    console.log('Image processing completed');
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

// Define the Lambda handler function
exports.handler = async (event) => {
  try {
    await processImage(event);
    return { statusCode: 200, body: 'Image processed successfully' };
  } catch (error) {
    return { statusCode: 500, body: 'Error processing image' };
  }
};
