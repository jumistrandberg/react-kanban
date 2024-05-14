import Column from "./Column";
import { useContext } from "react";
import DataContext from "./DataContext";

const ColumnList = () => {
  const { dataColumns } = useContext(DataContext);

  return (
    <>
      <div className="task-container">
        {columns.map((column) => (
          <Column key={column.id} title={column.title} />
        ))}
      </div>
    </>
  );
};

export default ColumnList;
