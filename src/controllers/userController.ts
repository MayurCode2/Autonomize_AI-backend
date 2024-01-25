import { Request, Response } from 'express';
import axios from 'axios';
import User from '../models/userModel';

class UserController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        res.status(200).json(existingUser);
        return;
      }

      const githubResponse = await axios.get(`https://api.github.com/users/${username}`);

      if (githubResponse.status !== 200) {
        res.status(githubResponse.status).json({ message: 'GitHub user not found.' });
        return;
      }

      const userData = githubResponse.data;

      const newUser = new User({
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

      await newUser.save();

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const { username, location } = req.query;

      const searchQuery: any = {};

      if (username) {
        searchQuery.username = { $regex: new RegExp(username as string, 'i') };
      }

      if (location) {
        searchQuery['location'] = { $regex: new RegExp(location as string, 'i') };
      }

      const searchResults = await User.find(searchQuery);

      res.status(200).json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async softDeleteUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }

      user.deleted = true;

      await user.save();

      res.status(200).json({ message: 'User soft deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async sortUsers(req: Request, res: Response): Promise<void> {
    try {
      const { sortBy } = req.query;

      const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];

      if (!validSortFields.includes(sortBy as string)) {
        res.status(400).json({ message: 'Invalid sortBy parameter.' });
        return;
      }

      const users = await User.find().sort({ [sortBy as string]: -1 });

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new UserController();
