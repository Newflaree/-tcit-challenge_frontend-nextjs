import { http, HttpResponse } from "msw";
import { API_URL } from "@/config/env";
import {
  apiErrorFixture,
  createdPostFixture,
  notFoundErrorFixture,
  postsFixture,
  type Post,
} from "../fixtures/posts";

const postsUrl = `${API_URL}/posts`;
const postByIdUrl = `${API_URL}/posts/:id`;

type NewPostBody = Pick<Post, "name" | "description">;

/**
 * Handlers base que replican el contrato del challenge (HU-06/07/08):
 * JSON camelCase, 201 al crear, 204 al eliminar y 404 si el post no existe.
 */
export const handlers = [
  http.get(postsUrl, () => HttpResponse.json(postsFixture)),

  http.post(postsUrl, async ({ request }) => {
    const body = (await request.json()) as NewPostBody;

    return HttpResponse.json(
      { ...createdPostFixture, name: body.name, description: body.description },
      { status: 201 },
    );
  }),

  http.delete(postByIdUrl, ({ params }) => {
    const post = postsFixture.find((p) => String(p.id) === params.id);

    if (!post) {
      return HttpResponse.json(
        {
          ...notFoundErrorFixture,
          message: `El post ${String(params.id)} no existe`,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(post, { status: 200 });
  }),
];

/**
 * Variantes de error para activar por test con `server.use(...)`.
 * Permiten ejercitar los estados de error de la UI sin backend real.
 */
export const errorHandlers = {
  listPostsFails: http.get(postsUrl, () =>
    HttpResponse.json(apiErrorFixture, { status: 500 }),
  ),
  createPostFails: http.post(postsUrl, () =>
    HttpResponse.json(apiErrorFixture, { status: 500 }),
  ),
  deletePostFails: http.delete(postByIdUrl, () =>
    HttpResponse.json(apiErrorFixture, { status: 500 }),
  ),
};
