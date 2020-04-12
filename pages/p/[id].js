import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import Head from 'next/head';

const Post = (props) => (
  <Layout>
    <Head>
      <title>{props.movie.title}</title>
      <meta property="og:title" content={props.movie.title} />
      <meta property="og:image" content={`http://image.tmdb.org/t/p/w342/${props.movie.poster_path}`} />
    </Head>
    <h1>{props.movie.title}</h1>
    <p>{props.movie.overview.replace(/<[/]?[pb]>/g, '')}</p>
    {props.movie.poster_path ? <img src={`http://image.tmdb.org/t/p/w342/${props.movie.poster_path}`} /> : null}
  </Layout>
);

Post.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5de339ee88941d862165471adf9d5473&language=en-US`);
  const movie = await res.json();
  console.log(movie)
  console.log(`Fetched movie: ${movie.title}`);

  return { movie };
};

export default Post;