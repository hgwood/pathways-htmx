import http from "node:http";
import * as elements from "typed-html";
import * as streamConsumers from "node:stream/consumers";

export const get: http.RequestListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    <div>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      <form hx-post="/html" hx-target="#stuff" hx-swap="beforeend">
        <input type="text" name="title"></input>
        <input type="text" name="content"></input>
        <button type="submit">Submit</button>
      </form>
      <article>
        <h1>Stuff</h1>
        <ul id="stuff"></ul>
      </article>
    </div>
  );
};

export const post: http.RequestListener = async (req, res) => {
  const form = new URLSearchParams(await streamConsumers.text(req));
  const title = form.get("title");
  res.writeHead(200);
  res.end(<li>{title}</li>);
};
