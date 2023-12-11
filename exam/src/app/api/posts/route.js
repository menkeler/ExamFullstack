import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();

        const createdPost = await prisma.post.create({
            data: {
                title: data.title,
                body: data.body,
                author: data.author,
            },
        });

        console.log(createdPost);

        return new Response(
            JSON.stringify({ message: "Post successfully added" }),
            { status: 201 } 
        );
    } catch (error) {
        console.error("Error adding post:", error);

        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500 }
        );
    } finally {
    
        await prisma.$disconnect();
    }
}

export async function GET(request) {
    const data = await prisma.post.findMany()

    return new Response(JSON.stringify(data))
}