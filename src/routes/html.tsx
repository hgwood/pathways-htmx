import http from "node:http";
import * as elements from "typed-html";
import * as streamConsumers from "node:stream/consumers";

const stuff: string[] = [];

export const get: http.RequestListener = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    <div>
      <form method="post">
        <input type="text" name="title"></input>
        <input type="text" name="content"></input>
        <button type="submit">Submit</button>
      </form>
      <article>
        <h1>Stuff</h1>
        <ul>
          {stuff.map((s) => (
            <li>s</li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export const post: http.RequestListener = async (req, res) => {
  const form = new URLSearchParams(await streamConsumers.text(req));
  const title = form.get("title");
  if (title) {
    stuff.push(title);
  }
  res.writeHead(302, { location: "/html" });
  res.end();
};
