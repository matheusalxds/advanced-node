import { DeleteFile, UploadFile } from '@/domain/contracts/gateways'
import { config, S3 } from 'aws-sdk'

export class AwsS3FileStorage implements UploadFile, DeleteFile {
  constructor (accessKey: string, secret: string, private readonly bucket: string) {
    config.update({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
  }

  async upload ({ fileName, file }: UploadFile.Input): Promise<UploadFile.Output> {
    await new S3().putObject({
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    }).promise()
    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(fileName)}`
  }

  async delete ({ fileName }: DeleteFile.Input): Promise<void> {
    const s3 = new S3()
    await s3.deleteObject({
      Bucket: this.bucket,
      Key: fileName
    }).promise()
  }
}
