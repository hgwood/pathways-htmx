import { Html } from "@kitajs/html";

export interface Column<T> {
  title?: string;
  renderTitle?: () => JSX.Element;
  render?: (item: T, index: number, items: T[]) => JSX.Element;
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
          {columns.map(({ title, renderTitle: safeRenderTitle }, index) => (
            <th scope="col">
              {title ?? safeRenderTitle?.()}
              {index === columns.length - 1 && (
                <div
                  class="htmx-indicator spinner-border spinner-border-sm float-end"
                  role="status"
                >
                  <span class="visually-hidden">Saving...</span>
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody class="align-middle">
        {dataSource.length > 0 ? (
          dataSource.map((item, index, items) => (
            <TableRow
              item={item}
              index={index}
              items={items}
              columns={columns}
            />
          ))
        ) : (
          <tr>
            <td colspan={columns.length}>Aucune donnée</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function TableRow<T>({
  item,
  index,
  items,
  columns,
}: {
  item: T;
  index: number;
  items: T[];
  columns: Column<T>[];
}) {
  return (
    <tr>
      {columns?.map(({ render: safeRender }) => (
        <td>{safeRender?.(item, index, items)}</td>
      ))}
    </tr>
  );
}
