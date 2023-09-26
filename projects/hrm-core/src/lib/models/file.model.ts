export class UploadFile {
    category?: string;
    fileName?: string;
    fileSize?: number;
    fileBytes?: number[];
    thumbnail: any;
    uploadId: any;
    urlPath: any;
    item: any;
}

export class FileDownload {
    content: any;
    extension?: string;
    mimeType?: string;
    fileName?: string;
    objectID?: string;
}