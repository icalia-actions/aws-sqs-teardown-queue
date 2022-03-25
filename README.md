# Teardown AWS SQS Queue

Removes a SQS queue

## Usage

```yaml
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1.6.1

      - name: Remove AWS SQS Queue
        uses: icalia-actions/aws-sqs-teardown-queue@v0.0.1
        with:
          queue-name: my-queue
```