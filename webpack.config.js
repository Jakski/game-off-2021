const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.NODE_ENV || "development";

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: "./index.ts",
	mode: ENV,
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[contenthash].js",
		clean: {
			keep: /index.html/,
		},
	},
	resolve: {
		extensions: [".js", ".ts", ".scss"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["ts-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				type: ENV === "production" ? "asset/resource" : "asset/inline",
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			minify: { collapseWhitespace: true },
		}),
		new webpack.DefinePlugin({
			"ENV": JSON.stringify(ENV)
		}),
	],
	optimization: {
		minimize: ENV === "production" ? true : false,
		minimizer: [new UglifyJsPlugin({
			uglifyOptions: {
				mangle: true,
				compress: true,
			},
		})],
	},
	devtool: ENV === "production" ? false : "inline-source-map",
	devServer: {
		port: process.env.PORT || 8080,
		host: "127.0.0.1",
		static: "dist",
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: "/index.html" },
			]
		}
	},
};
