// Define the type for a folder node
export interface FolderNode {
    name: string;
    id: number;
    isFolder: boolean;
    children: FolderNode[];
}

export interface FolderProps {
    folders: FolderNode
}