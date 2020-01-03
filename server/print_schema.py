# import subprocess

from graphql.utils import schema_printer

from schema import schema


# def patched_print_object(type):
#     """
#     This patch is needed so that multiple inheritance in the graphql schema is printed with ampersands and not comma, e.g.

#       type TeacherReviewActivity implements Activity & ReviewActivity {

#     instead of

#       type TeacherReviewActivity implements Activity, ReviewActivity {

#     graphql-schema-typescript implements a newer graphql spec which uses the ampersand whereas graphql-core v2.2.1 is using
#     the older style comma based separation between parents.

#     This won't be necessary anymore when we transition to graphene v3 / graphql-core-next, since the schema printer
#     in there generates the new-style schema out of the box.
#     """

#     interfaces = type.interfaces
#     implemented_interfaces = (
#         " implements {}".format(" & ".join(i.name for i in interfaces))
#         if interfaces
#         else ""
#     )

#     return ("type {}{} {{\n" "{}\n" "}}").format(
#         type.name, implemented_interfaces, schema_printer._print_fields(type)
#     )


# schema_printer._print_object = patched_print_object


if __name__ == '__main__':
    schema_str = schema_printer.print_schema(schema)
    with open(f'schema.graphql', 'w') as schema_file:
        schema_file.write(schema_str)

    # subprocess.run(
    #     "npm run generate-graphql-types", shell=True, cwd=settings.JS_DIR
    # )
