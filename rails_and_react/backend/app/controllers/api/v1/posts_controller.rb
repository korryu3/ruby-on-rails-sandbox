class Api::V1::PostsController < ApplicationController
  before_action :set_posts, only: %i[ show update destroy ]

  def index
    posts = Post.all
    render json: posts
  end

  def show
    render json: @post
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post, status: :created
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errorsm, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    head :no_content
  end

  private

    def set_posts
      @post = Post.find(params[:id])
    end

    def post_params
      params.expect(posts: %i[ title body ])
    end

end
