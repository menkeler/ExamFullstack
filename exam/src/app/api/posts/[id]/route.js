import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
      return new Response("Invalid Post ID", { status: 400 });
    }

    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!data) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching post data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
      return new Response("Invalid Post ID", { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }

    const requestData = await request.json();
    const { title, body } = requestData;

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        body,
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
      return new Response("Invalid Post ID", { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new Response("Post deleted successfully", { status: 204 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
