import { Pinecone } from "@pinecone-database/pinecone";

export const createPineconeIndex = async () => {
	try {
		const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
		const indexName = "yapster";
		return await pc.createIndex({
			name: indexName,
			dimension: 1536,
			metric: "cosine",
			spec: {
				serverless: {
					cloud: "aws",
					region: "us-east-1",
				},
			},
		});
	} catch (error) {
		console.log("Error to create index");
	}
};

createPineconeIndex();
