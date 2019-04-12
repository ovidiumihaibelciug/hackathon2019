import React from 'react';
import { Registry } from 'react-molecule';
import { Pagination } from 'antd';

Registry.blend({
  EasyPagination({ pageCount, forcePage, onPageChange }) {
    return (
      <Pagination
        defaultCurrent={forcePage}
        onChange={(page) => {
          onPageChange({ selected: page - 1 });
        }}
        total={pageCount * 10}
      />
    );
  },
  EasyTableHeader(props) {
    return <thead className="ant-table-thead" {...props} />;
  },
  EasyTableBody(props) {
    return <tbody className="ant-table-tbody" {...props} />;
  },
  EasyTableRow(props) {
    return <tr className="ant-table-row ant-table-row-level-0" {...props} />;
  },
});
