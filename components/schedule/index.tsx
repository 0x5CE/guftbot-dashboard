import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DraggableTableRow } from "./draggable-table-row";
import { StaticTableRow } from "./static-table-row";

export interface Data {
  date: string;
  prompt: string;
  isPicture: boolean;
  topics: string;
  actions: boolean;
}

const rowsData: Data[] = [
  {
    date: "Sat, Jul 23",
    prompt: "Prompt 1",
    isPicture: true,
    topics: "Topic 1, Topic 2",
    actions: true,
  },
  {
    date: "Sat, Jul 23",
    prompt: "Prompt 2",
    isPicture: false,
    topics: "Topic 1, Topic 2",
    actions: true,
  },
  {
    date: "Sat, Jul 24",
    prompt: "Prompt 3",
    isPicture: false,
    topics: "Banter",
    actions: true,
  },
];

const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor("date", {
    header: () => "Date",
  }),
  columnHelper.accessor("prompt", {
    header: () => "Prompt",
  }),
  columnHelper.accessor("isPicture", {
    header: () => "",
  }),
  columnHelper.accessor("topics", {
    header: () => "Topics",
  }),
  columnHelper.accessor("actions", {
    header: () => "",
  }),
];

export const Schedule = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [data, setData] = useState(rowsData);
  const items = useMemo(() => data.map((_, index) => index + 1), [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as number);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      setData((data) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over?.id as number);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const selectedRow = useMemo(() => {
    if (activeId == null) {
      return null;
    }
    const rows = table.getRowModel().rows;
    const row = rows.find((_, index) => index + 1 === activeId) || null;
    return row;
  }, [activeId, table]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <DraggableTableRow key={index} row={row} />
          ))}
        </Tbody>
      </Table>
      <DragOverlay>
        {activeId && selectedRow && (
          <Table>
            <Tbody>
              <StaticTableRow row={selectedRow} />
            </Tbody>
          </Table>
        )}
      </DragOverlay>
    </DndContext>
  );
};
