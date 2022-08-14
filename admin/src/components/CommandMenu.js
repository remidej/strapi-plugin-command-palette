import React from 'react';
import { Command } from 'cmdk'

const CommandMenu = ({ onOpenChange, open }) => {
  return (
    <Command.Dialog label="Command Menu" open={open} onOpenChange={onOpenChange}>
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Letters">
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </Command.Dialog>
  )
}

export default CommandMenu;
