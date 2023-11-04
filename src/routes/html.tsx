import http from "node:http";
import * as elements from "typed-html";
import * as streamConsumers from "node:stream/consumers";

const stuff: string[] = [];

export const get: http.RequestListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    <div>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      <form
        hx-post="/html"
        hx-target="#stuff"
        hx-select="#elem"
        hx-swap="beforeend"
        hx-select-oob="#title"
      >
        <input type="text" name="title"></input>
        <input type="text" name="content"></input>
        <button type="submit">Submit</button>
      </form>
      <article>
        <h1 id="title">{stuff.length} things</h1>
        <ul id="stuff">
          {stuff.map((thing) => (
            <li>{thing}</li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export const post: http.RequestListener = async (req, res) => {
  const form = new URLSearchParams(await streamConsumers.text(req));
  const title = form.get("title") || "untitled";
  stuff.push(title);
  res.writeHead(200);
  res.end(
    <div>
      <h1 id="title">{stuff.length} things</h1>
      <li id="elem">{title}</li>
    </div>
  );
};
