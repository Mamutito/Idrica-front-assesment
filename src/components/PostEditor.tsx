import React from "react";

const PostEditor: React.FC<{
  title: string;
  body: string;
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}> = ({ title, body, onChangeTitle, onChangeBody, onSave, onCancel }) => {
  return (
    <div className="p-6 flex flex-col flex-grow">
      <input
        type="text"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => onChangeBody(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 flex-grow"
        rows={4}
        placeholder="Body"
      />
      <div className="flex justify-end space-x-2 mt-auto">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PostEditor;
