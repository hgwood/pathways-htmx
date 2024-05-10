import { Html } from "@kitajs/html";

export interface Column<T, Args extends unknown[] = []> {
  title?: string;
  renderTitle?: () => JSX.Element;
  render?: (item: T, index: number, items: T[], ...args: Args) => JSX.Element;
}

export function Table<T, Args extends unknown[] = []>({
  dataSource,
  columns,
  id,
  size = "default",
  borders = "default",
  hover = false,
  shadow = true,
  includeIndicator = true,
  args,
  active,
}: {
  dataSource: T[];
  columns: Column<T>[];
  id: string;
  size?: "default" | "sm";
  borders?: "default" | "all" | "none";
  hover?: boolean;
  shadow?: boolean;
  includeIndicator?: boolean;
  args?: Args;
  active?: (item: T, index: number, items: T[], ...args: Args) => boolean;
}) {
  return (
    <table
      class={[
        "table",
        size === "sm" && "table-sm",
        borders === "all" && "table-bordered",
        borders === "none" && "table-borderless",
        hover && "table-hover",
        !shadow && "shadow-none",
      ]}
      id={id}
    >
      <thead>
        <tr>
          {columns.map(({ title, renderTitle: safeRenderTitle }, index) => (
            <th scope="col">
              {title ?? safeRenderTitle?.()}
              {includeIndicator && index === columns.length - 1 && (
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
              args={args}
              active={active}
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

export function TableRow<T, Args extends unknown[] = []>({
  item,
  index,
  items,
  columns,
  args,
  active,
}: {
  item: T;
  index: number;
  items: T[];
  columns: Column<T, Args>[];
  args?: Args;
  active?: (item: T, index: number, items: T[], ...args: Args) => boolean;
}) {
  return (
    <tr
      class={[active?.(item, index, items, ...(args ?? [])) && "table-active"]}
    >
      {columns?.map(({ render: safeRender }) => (
        <td>{safeRender?.(item, index, items, ...(args ?? []))}</td>
      ))}
    </tr>
  );
}
