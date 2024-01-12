import { Html } from "@kitajs/html";

export interface Column<T> {
  title?: string;
  render?: (item: T) => JSX.Element;
}

export function Table<T>({
  dataSource,
  columns,
}: {
  dataSource: T[];
  columns?: Column<T>[];
}) {
  return (
    <table class="table">
      {!!columns && (
        <thead>
          <tr>
            {columns.map(({ title }) => (
              <th scope="col" safe>
                {title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {dataSource.map((item) => (
          <tr>
            {columns?.map(({ render }) => (
              <td>{render?.(item)}</td>
            ))}
          </tr>
        ))}
        {/* <tr>
          <td>
            <select name="typeExamen" class="form-control">
              <option selected>Ecrit</option>
              <option>Oral</option>
              <option>Pratique</option>
            </select>
          </td>
          <td>
            <input
              name="coefficientExamen"
              type="number"
              min="0"
              class="form-control"
              value="3"
            ></input>
          </td>
          <td>
            <input
              name="duréeExamen"
              type="number"
              min="0"
              class="form-control"
              value="2"
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <select name="typeExamen" class="form-control">
              <option>Ecrit</option>
              <option selected>Oral</option>
              <option>Pratique</option>
            </select>
          </td>
          <td>
            <input
              name="coefficientExamen"
              type="number"
              min="0"
              class="form-control"
              value="1"
            ></input>
          </td>
          <td>
            <input
              name="duréeExamen"
              type="number"
              min="0"
              class="form-control"
              value="1"
            ></input>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
}
