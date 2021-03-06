import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Page } from './';

const PageListDiv = styled.div`
	display: flex;
	flex-direction: row;
	// justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	margin-top: 1rem;
`;

class PageList extends Component {
	render() {
		return (
			<PageListDiv>
				{this.props.filteredPages === undefined ||
				this.props.filteredPages.length === 0
					? this.props.pages.map(page => {
							return (
								<Page
									page={page}
									modalPage={this.props.modalPage}
									handleDelete={this.props.handleDelete}
									key={page.id}
								/>
							);
					  })
					: this.props.filteredPages.map(page => {
							return (
								<Page
									page={page}
									modalPage={this.props.modalPage}
									handleDelete={this.props.handleDelete}
									key={page.id}
								/>
							);
					  })}
			</PageListDiv>
		);
	}
}

PageList.propTypes = {
	pages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			title: PropTypes.string,
			author: PropTypes.string,
			normal_url: PropTypes.string,
			resolved_url: PropTypes.string,
			date_saved: PropTypes.string,
			date_published: PropTypes.string,
			excerpt: PropTypes.string,
			cover_image: PropTypes.string,
			tags: PropTypes.string,
			text: PropTypes.string
		})
	).isRequired,
	modalPage: PropTypes.func
};

export default PageList;
