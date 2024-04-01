import { Html, type Component } from "@kitajs/html";

export interface Column<T> {
  title?: string;
  render?: (item: T) => JSX.Element;
}

export function Table<T>({
  dataSource,
  columns,
  id,
}: {
  dataSource: T[];
  columns: Column<T>[];
  id: string;
}) {
  return (
    <table class="table" id={id}>
      <thead>
        <tr>
          {columns.map(({ title }) => (
            <th scope="col" safe>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody class="align-baseline">
        {dataSource.map((item) => (
          <TableRow item={item} columns={columns} />
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

export function TableRow<T>({
  item,
  columns,
}: {
  item: T;
  columns: Column<T>[];
}) {
  return (
    <tr>
      {columns?.map(({ render }) => (
        <td>{render?.(item)}</td>
      ))}
    </tr>
  );
}
