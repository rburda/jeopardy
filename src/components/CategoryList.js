import React, { Component } from 'react';
import Category from './Category';
import { render } from 'react-dom';
import '../css/category_list.css';

export default class CategoryList extends React.Component {
  render() {
    const {categories, onSelectQuestion} = this.props;
      return (
        <ul className="catcolumnlist">
          {categories ? categories.map((v, i) =>
            <Category key={i} onSelectQuestion={onSelectQuestion} cat={v} />
          ) : ""}
        </ul>
      );
  }
}