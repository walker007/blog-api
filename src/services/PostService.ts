import { Post, PrismaClient } from "@prisma/client";
import { NotFoundException } from "../exceptions/NotFoundException";

interface CreatePost extends Omit<Post, "id" | "createdAt" | "updatedAt"> {}
interface UpdatePost extends Partial<CreatePost> {
  id: string;
}

export class PostService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPost(post: CreatePost): Promise<Post> {
    return await this.prisma.post.create({
      data: post,
    });
  }

  async updatePost(id: string, post: UpdatePost): Promise<Post> {
    return this.prisma.post.update({
      data: post,
      where: {
        id,
      },
    });
  }

  async getAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async getById(id: string): Promise<Post> {
    const post = this.prisma.post.findFirst({
      where: { id: id },
    });

    if (post === null) {
      throw new NotFoundException("Post não foi encontrado");
    }

    return post;
  }

  async deletePost(id: string): Promise<void> {
    const post = this.getById(id);
    this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
