import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { FilteredPostDto, UpdatePostDto } from './dto';
import { User } from 'users/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postsRepo: Repository<Post>) {}

  async findCreated(id: string): Promise<string> {
    const { user } = await this.getPostById(id);
    return user.id;
  }

  async createPost(
    createPost: CreatePostDto,
    currentUser: User,
  ): Promise<Post> {
    const post = new Post();
    post.content = createPost.content;
    post.user = currentUser;
    return await this.postsRepo.save(post);
  }

  async getFilteredPosts(filteredPostDto: FilteredPostDto): Promise<Post[]> {
    // no queries
    if (Object.keys(filteredPostDto).length === 0) {
      return this.postsRepo.find({
        where: {},
      });
    }
    // else
    const query = this.postsRepo.createQueryBuilder('post');
    const { content } = filteredPostDto;
    query.andWhere('post.content LIKE :content', { content: `%${content}%` });
    const posts = await query.getMany();
    if (posts.length === 0)
      throw new NotFoundException(`No posts with content of '${content}'`);
    return posts;
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepo.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post ${id} not found`);
    }

    return post;
  }

  async updatePost(id: string, updatePost: UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);

    post.content = updatePost.content;
    post.updatedAt = new Date();
    return await this.postsRepo.save(post);
  }
}
