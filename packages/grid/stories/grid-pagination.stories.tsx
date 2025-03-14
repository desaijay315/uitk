import { Story } from "@storybook/react";
import { useMemo, useState } from "react";
import { FlexLayout } from "@jpmorganchase/uitk-core";
import { Grid, GridColumn, RowSelectionCheckboxColumn } from "../src";
import { Pagination, Paginator } from "@jpmorganchase/uitk-lab";
import { createDummyInvestors, investorKeyGetter } from "./dummyData";

export default {
  title: "Grid/New Grid",
  component: Grid,
  argTypes: {},
};

const dummyInvestors = createDummyInvestors();

const GridPaginationTemplate: Story<{}> = (props) => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 7;
  const pageCount = Math.ceil(dummyInvestors.length / pageSize);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const rowData = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, dummyInvestors.length);
    return dummyInvestors.slice(start, end);
  }, [pageSize, page]);

  return (
    <FlexLayout direction={"column"} align={"end"}>
      <Grid
        rowData={rowData}
        rowKeyGetter={investorKeyGetter}
        className="paginatedGrid"
        zebra={true}
        columnSeparators={true}
      >
        <RowSelectionCheckboxColumn id="rowSelection" />
        <GridColumn
          name="Name"
          id="name"
          defaultWidth={200}
          getValue={(x) => x.name}
        />
        <GridColumn
          name="Location"
          id="location"
          defaultWidth={150}
          getValue={(x) => x.location}
        />
        <GridColumn
          name="Amount"
          id="amount"
          defaultWidth={200}
          getValue={(x) => x.amount.toFixed(4)}
          align="right"
        />
      </Grid>
      <Pagination page={page} onPageChange={onPageChange} count={pageCount}>
        <Paginator />
      </Pagination>
    </FlexLayout>
  );
};

export const GridPagination = GridPaginationTemplate.bind({});
