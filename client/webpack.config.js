const webpack = require('webpack');

//절대경로를 참조하기 위해 path를 불러오기
const path = require('path');

//웹팩에서 HTML을 다루기위한 플로그인을 불러오기
const HtmlWebpackPlugin = require('html-webpack-plugin');

// HTML 파일에서 %ENV% 같은 템플릿 구문 사용 가능
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  // 번들 파일로 만들기 위한 시작 파일(entry)을 설정
  // 생성될 번들 파일은 js 폴더 하위에 app.js라는 이름으로 생성
  // 이 파일은 ./src/App.jsx를 시작으로 번들링(하나로 합치기)합니다.
  entry: {
    'js/app': ['./src/App.tsx'],
  },

  // 생성된 번들 파일(bundle)은 ./build/ 폴더에 생성
  // publicPath를 지정함으로써 HTML등 다른 파일에서 생성된 번들을 참조할 때, /을 기준으로 참조
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/',
  },

  devServer: {
    //HTML5의 History API를 사용할 때, 라우팅 설정한 url에 접근할 때 html파일을 서빙할지를 결정
    historyApiFallback: true,
    port: 3000,
    //바뀐 컴포넌트만 새로 리로딩하는 옵션
    hot: true,
  },

  // ts와 tsx는 babel(바벨)을 이용하여 빌드
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            // ts-loader의 옵션은 성능 향상을 위해서
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        // 10k 미만의 이미지 파일을 인라인으로 쓰거나 10k 이상의 이미지 파일을 복사한다.
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'image/[name].[hash:8].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        // 10k 미만의 파일을 인라인으로 쓰거나 10k 이상의 파일을 복사합니다.
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    // path alias를 설정하는 부분
    // 너무 많이 설정하면, 속도 저하의 원인이 된다
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },

    // import하는 파일의 가능한 확장자명
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
  },

  // ./src/index.html 파일을 build 경로에 index.html로 파일을 생성
  // 파일을 생성할 때, Webpack(웹팩)이 만든 번들 파일(/js/app.js)를 HTML에 추가하여 생성
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      favicon: 'src/assets/favicon.ico',
    }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: 'src/assets/' }),
    // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
    // 타입 체크 과정을 별도의 분리된 프로세스에서 실행되게끔 한다.
    new ForkTsCheckerWebpackPlugin(),
  ],
};
