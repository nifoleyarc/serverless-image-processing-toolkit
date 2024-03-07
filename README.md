# Serverless Image Processing Toolkit

The Serverless Image Processing Toolkit is a JavaScript package for processing images stored in an AWS S3 bucket using AWS Lambda and the Sharp image processing library.

## Installation

```
npm install serverless-image-processing-toolkit
```

## Usage

```javascript
const ImageProcessor = require('serverless-image-processing-toolkit');

// Create a new instance of ImageProcessor
const imageProcessor = new ImageProcessor();

// Define a sample S3 event
const event = {
  Records: [
    {
      s3: {
        bucket: {
          name: 'your-source-bucket'
        },
        object: {
          key: 'example.jpg'
        }
      }
    }
  ]
};

// Process the image
imageProcessor.processImage(event);
```

## Features

- Resize images to a maximum width of 800 pixels.
- Automatically handle image uploads and processing using AWS Lambda and S3 event triggers.
- Easy integration with existing AWS infrastructure.

## Configuration

Before using the package, ensure that you have set up the following:

1. AWS credentials and permissions configured locally or on the execution environment.
2. Proper permissions set on the source and destination S3 buckets for reading and writing images.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
