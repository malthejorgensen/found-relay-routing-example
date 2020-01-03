import graphene
from graphene.relay import Node
import graphql
from graphql_relay import from_global_id

# from .models.assignment import Assignment


class Course(graphene.ObjectType, interfaces=[graphene.relay.Node]):
    title = graphene.String(
        description='Returns the title of the course', required=True
    )
    description = graphene.String(
        description='Returns the description of the course', required=True
    )

    def resolve_title(obj, info):
        return obj.title


COURSES = [
    Course(id='abc', title='TFS ABC TFS', description='The alphabet'),
    Course(id='1234', title='TFS 1234 TFS', description='The first four numbers'),
]


class Query(graphene.ObjectType):
    node = Node.Field()  # required by Relay spec
    courses = graphene.List(Course, required=False, description='Returns all courses')
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
    def resolve_courses(self, info):
        return [c for c in COURSES]

    def resolve_course(self, info, id):
        object_type, object_id = from_global_id(id)
        if object_type != 'Course':
            raise graphql.GraphQLError('Bad course id')

        return [c for c in COURSES if c.id == object_id][0]

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


class UpdateCourseDescription(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID()
        description = graphene.ID()

    course = graphene.Field(Course, required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        course_id = input.get('id')
        object_type, object_id = from_global_id(course_id)
        if object_type != 'Course':
            raise graphql.GraphQLError('Bad course id')

        index, course = [(i, c) for i, c in enumerate(COURSES) if c.id == object_id][0]

        course.description = input.get('description')
        COURSES[index] = course

        return UpdateCourseDescription(course=course)


class Mutation(graphene.ObjectType):
    update_course_description = UpdateCourseDescription.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
