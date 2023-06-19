import { Document } from 'langchain/document';
import { readFile } from 'fs/promises';
import { BaseDocumentLoader } from 'langchain/document_loaders';
import mammoth from 'mammoth';

export abstract class BufferLoader extends BaseDocumentLoader {
    constructor(public filePathOrBlob: string | Blob) {
        super();
    }

    protected abstract parse(
        raw: Buffer,
        metadata: Document['metadata'],
    ): Promise<Document[]>;

    public async load(): Promise<Document[]> {
        let buffer: Buffer;
        let metadata: Record<string, string>;
        if (typeof this.filePathOrBlob === 'string') {
            buffer = await readFile(this.filePathOrBlob);
            metadata = { source: this.filePathOrBlob };
        } else {
            buffer = await this.filePathOrBlob
                .arrayBuffer()
                .then((ab) => Buffer.from(ab));
            metadata = { source: 'blob', blobType: this.filePathOrBlob.type };
        }
        return this.parse(buffer, metadata);
    }
}

export class CustomDocxLoader extends BufferLoader {
    constructor(
        filePathOrBlob: string | Blob,
        public extraMetadata: Record<string, string> = {},
    ) {
        super(filePathOrBlob);
    }

    public async parse(
        raw: Buffer,
        metadata: Document["metadata"]
    ): Promise<Document[]> {
        const { extractRawText } = await DocxLoaderImports();
        const docx = await extractRawText({
            buffer: raw,
        });

        if (!docx.value) return [];

        return [
            new Document({
                pageContent: docx.value,
                metadata: {
                    ...metadata,
                    ...this.extraMetadata
                },
            }),
        ];
    }
}

async function DocxLoaderImports() {
    try {
        const { extractRawText } = mammoth;
        return { extractRawText };
    } catch (e) {
        console.error(e);
        throw new Error(
            "Failed to load mammoth. Please install it with eg. `npm install mammoth`."
        );
    }
}