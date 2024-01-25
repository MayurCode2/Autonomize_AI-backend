"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            try {
                const existingUser = yield userModel_1.default.findOne({ username });
                if (existingUser) {
                    res.status(200).json(existingUser);
                    return;
                }
                const githubResponse = yield axios_1.default.get(`https://api.github.com/users/${username}`);
                if (githubResponse.status !== 200) {
                    res.status(githubResponse.status).json({ message: 'GitHub user not found.' });
                    return;
                }
                const userData = githubResponse.data;
                const newUser = new userModel_1.default({
                    username: userData.login,
                    id: userData.id,
                    node_id: userData.node_id,
                    avatar_url: userData.avatar_url,
                    gravatar_id: userData.gravatar_id,
                    url: userData.url,
                    html_url: userData.html_url,
                    followers_url: userData.followers_url,
                    following_url: userData.following_url,
                    gists_url: userData.gists_url,
                    starred_url: userData.starred_url,
                    subscriptions_url: userData.subscriptions_url,
                    organizations_url: userData.organizations_url,
                    repos_url: userData.repos_url,
                    events_url: userData.events_url,
                    received_events_url: userData.received_events_url,
                    type: userData.type,
                    site_admin: userData.site_admin,
                    name: userData.name,
                    company: userData.company,
                    blog: userData.blog,
                    location: userData.location,
                    email: userData.email,
                    hireable: userData.hireable,
                    bio: userData.bio,
                    twitter_username: userData.twitter_username,
                    public_repos: userData.public_repos,
                    public_gists: userData.public_gists,
                    followers: userData.followers,
                    following: userData.following,
                    created_at: userData.created_at,
                    updated_at: userData.updated_at,
                });
                yield newUser.save();
                res.status(201).json(newUser);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    searchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, location } = req.query;
                const searchQuery = {};
                if (username) {
                    searchQuery.username = { $regex: new RegExp(username, 'i') };
                }
                if (location) {
                    searchQuery['location'] = { $regex: new RegExp(location, 'i') };
                }
                const searchResults = yield userModel_1.default.find(searchQuery);
                res.status(200).json(searchResults);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    softDeleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            try {
                const user = yield userModel_1.default.findOne({ username });
                if (!user) {
                    res.status(404).json({ message: 'User not found.' });
                    return;
                }
                user.deleted = true;
                yield user.save();
                res.status(200).json({ message: 'User soft deleted successfully.' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    sortUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sortBy } = req.query;
                const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
                if (!validSortFields.includes(sortBy)) {
                    res.status(400).json({ message: 'Invalid sortBy parameter.' });
                    return;
                }
                const users = yield userModel_1.default.find().sort({ [sortBy]: -1 });
                res.status(200).json(users);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new UserController();
