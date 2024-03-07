#!/bin/bash

# Configuration variables
BUCKET_NAME=primeng-template-bucket1
REGION=us-east-1
DIST_FOLDER=dist/sakai-ng/*

# Create S3 bucket
aws s3 mb s3://$BUCKET_NAME --region $REGION

# Enable public access
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://s3-bucket-policy.json

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html

# Sync dist folder to S3 bucket
aws s3 sync $DIST_FOLDER s3://$BUCKET_NAME/ --acl public-read

echo "Deployment completed: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
