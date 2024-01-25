import mongoose, { Document } from 'mongoose';

interface UserSchema extends Document {
  username: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
  deleted: boolean;
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    username: { type: String, unique: true, required: true },
    id: { type: String },
    node_id: String,
    avatar_url: String,
    gravatar_id: String,
    url: String,
    html_url: String,
    followers_url: String,
    following_url: String,
    gists_url: String,
    starred_url: String,
    subscriptions_url: String,
    organizations_url: String,
    repos_url: String,
    events_url: String,
    received_events_url: String,
    type: String,
    site_admin: Boolean,
    name: String,
    company: String,
    blog: String,
    location: String,
    email: String,
    hireable: Boolean,
    bio: String,
    twitter_username: String,
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,
    created_at: Date,
    updated_at: Date,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<UserSchema>('User', userSchema);

export default User;
