import {Args, Mutation, Query, Resolver, Subscription} from "@nestjs/graphql";

import {TodoGqlObject} from "./model/todo.gql.object";
import {TodoService} from "./todo.service";
import {TodoArgs, TodoInput} from "./model/todo.gql.args";
import {GraphQLBoolean} from "graphql";
import {Inject, UseGuards} from "@nestjs/common";
import {PubSubEngine} from "graphql-subscriptions";
import {GqlGuard} from "../auth/guards/gql.guard";

const TODO_ADDED = "todoAdded",
  TODO_UPDATED = "todoUpdated",
  TODO_DELETED = "todoRemoved";

@Resolver(of => TodoGqlObject)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    @Inject("PUB_SUB") private pubSub: PubSubEngine
  ) {}

  @Query(returns => [TodoGqlObject], { defaultValue: [], nullable: true })
  async todos() {
    return await this.todoService.getAll();
  }

  @Query(returns => TodoGqlObject)
  async todo(@Args() args: TodoArgs) {
    return await this.todoService.getOne(args.id);
  }

  @UseGuards(GqlGuard)
  @Mutation(returns => TodoGqlObject)
  async create(@Args("newTodoData") newTodoData: TodoInput) {
    const todo = await this.todoService.create(newTodoData);

    this.pubSub.publish(TODO_ADDED, { todoAdded: todo });
    return todo;
  }

  @UseGuards(GqlGuard)
  @Mutation(returns => TodoGqlObject)
  async update(@Args("newTodoData") newTodoData: TodoInput) {
    const todo = await this.todoService.update(newTodoData);
    await this.pubSub.publish(TODO_UPDATED, { TODO_UPDATED: todo });
    return todo;
  }

  @UseGuards(GqlGuard)
  @Mutation(returns => GraphQLBoolean)
  async delete(@Args({ name: "id", type: () => String }) id: string) {
    const todo = await this.todoService.delete(id);
    await this.pubSub.publish(TODO_DELETED, { TODO_DELETED: todo });
    return todo;
  }

  @Subscription(returns => TodoGqlObject)
  todoAdded() {
    return this.pubSub.asyncIterator(TODO_ADDED);
  }

  @Subscription(returns => TodoGqlObject)
  todoUpdated() {
    return this.pubSub.asyncIterator(TODO_UPDATED);
  }

  @Subscription(returns => TodoGqlObject)
  todoRemoved() {
    return this.pubSub.asyncIterator(TODO_DELETED);
  }
}
