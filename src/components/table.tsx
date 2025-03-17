import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
// import { TableCell as BaseTableCell } from "@tiptap/extension-table-cell";
import Table from "@tiptap/extension-table";

export const TableCellExtension = Table.configure({
  resizable: true,
}).extend({
  addNodeView() {
    return ReactNodeViewRenderer(TableCellWithMenu);
  },
});

const TableCellWithMenu = ({ editor, node, getPos }: any) => {
  const isEditable = editor && editor.isEditable;

  const handleContextAction = (action: () => void) => {
    if (!isEditable) return;
    action();
    editor.commands.focus();
  };

  return (
    <NodeViewWrapper as="table" className="relative">
      <ContextMenu>
        <ContextMenuTrigger
          className="h-full w-full"
          onContextMenu={(e) => isEditable && e.stopPropagation()}
        >
          <NodeViewContent />
        </ContextMenuTrigger>

        {isEditable && (
          <ContextMenuContent className="w-48">
            <ContextMenuSub>
              <ContextMenuSubTrigger>Row</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() =>
                      editor.chain().addRowBefore().run()
                    )
                  }
                >
                  Add Row Before
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() =>
                      editor.chain().addRowAfter().run()
                    )
                  }
                >
                  Add Row After
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() => editor.chain().deleteRow().run())
                  }
                >
                  Delete Row
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSub>
              <ContextMenuSubTrigger>Column</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() =>
                      editor.chain().addColumnBefore().run()
                    )
                  }
                >
                  Add Column Before
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() =>
                      editor.chain().addColumnAfter().run()
                    )
                  }
                >
                  Add Column After
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() =>
                      editor.chain().deleteColumn().run()
                    )
                  }
                >
                  Delete Column
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSeparator />

            <ContextMenuSub>
              <ContextMenuSubTrigger>Cell</ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() => editor.chain().mergeCells().run())
                  }
                >
                  Merge Cells
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() => editor.chain().splitCell().run())
                  }
                >
                  Split Cell
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() =>
                    handleContextAction(() =>
                      editor.chain().toggleHeaderCell().run()
                    )
                  }
                >
                  Toggle Header
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>

            <ContextMenuSeparator />

            <ContextMenuItem
              onClick={() =>
                handleContextAction(() => editor.chain().deleteTable().run())
              }
              className="text-destructive"
            >
              Delete Table
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </NodeViewWrapper>
  );
};
