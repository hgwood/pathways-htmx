import { Html } from "@kitajs/html";

export interface Column<T> {
  title?: string;
  renderTitle?: () => JSX.Element;
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
          {columns.map(({ title, renderTitle: safeRenderTitle }) => (
            <th scope="col">{title ?? safeRenderTitle?.()}</th>
          ))}
        </tr>
      </thead>
      <tbody class="align-middle">
        {dataSource.map((item) => (
          <TableRow item={item} columns={columns} />
        ))}
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
      {columns?.map(({ render: safeRender }) => (
        <td>{safeRender?.(item)}</td>
      ))}
    </tr>
  );
}
