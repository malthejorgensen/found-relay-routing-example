import graphene
from graphene.relay import Node
import graphql
from graphql_relay import from_global_id

# from .models.assignment import Assignment


class Course(graphene.ObjectType, interfaces=[graphene.relay.Node]):
    title = graphene.String(
        description='Returns the title of the course', required=True
    )

    def resolve_title(obj, info):
        return f'TFS {obj.title} TFS'


class Query(graphene.ObjectType):
    node = Node.Field()  # required by Relay spec
    course = graphene.Field(
        Course,
        id=graphene.ID(required=True),
        required=False,
        description='Returns course by id',
    )
    # assignment = graphene.Field(
    #     Assignment,
    #     id=graphene.ID(required=True),
    #     required=False,
    #     description='Returns assignment by id',
    # )

    def resolve_course(self, info, id):
        object_type, object_id = from_global_id(id)
        if object_type != 'Course':
            raise graphql.GraphQLError('Bad course id')

        return Course(title=object_id)

    # def resolve_assignment(self, info, id):
    #     object_type, object_id = from_global_id(id)
    #     if object_type != 'Assignment':
    #         raise graphql.GraphQLError('Bad assignment id')

    #     try:
    #         assignment = model.Assignment.objects.get(id=object_id)
    #     except model.Assignment.DoesNotExist:
    #         return None

    #     p = info.context.permissions
    #     if not p.has_teacher_permission(
    #         assignment.course
    #     ) and not p.has_student_permission(assignment.course):
    #         return None

    #     return assignment


class AddLetterToCourseTitle(graphene.relay.ClientIDMutation):
    class Input:
        course_id = graphene.ID()

    course = graphene.Field(Course, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        course_id = input.get('course_id')

        return AddLetterToCourseTitle(course=Course())


class Mutation(graphene.ObjectType):
    add_letter_to_course_title = AddLetterToCourseTitle.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
