import Layout from './components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import React, { PureComponent } from 'react';

export default class Index extends PureComponent {
  static async getInitialProps(context) {
    const data = await getData(context.query.page);
    return { data };
    // const page = context.query.page || 1;
    // const res = await fetch(`http://api.themoviedb.org/3/movie/popular?api_key=5de339ee88941d862165471adf9d5473&page=${page}`);
    // const data = await res.json()
    // console.log(`Show data fetched. Count: ${data.page}`);
    // return { data };
  }

  state = {
    data: this.props.data
  };

  componentDidMount() {
    console.log(this.props)
  }

  onClickLoadMore = async () => {
    let { page, results } = this.state.data;
    page += 1;
    const data = await getData(page + 1);
    results = Array.prototype.concat(results, data.results);
    this.setState({ data: { ...this.state.data.results, results, page } })
  }

  render() {
    const { data } = this.state;
    return (
      <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
          {data && data.results && data.results.map((movie) => (
            <li key={movie.id}>
              <Link href="/p/[id]" as={`/p/${movie.id}`}>
                <a>{movie.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={this.onClickLoadMore}>Load More</button>
      </Layout>
    )
  }
}

const getData = async (page = 1) => {
  const res = await fetch(`http://api.themoviedb.org/3/movie/popular?api_key=5de339ee88941d862165471adf9d5473&page=${page}`);
  const data = await res.json()
  console.log(`Show data fetched. Count: ${data.page}`);
  return data;
}