import React, { Fragment, PureComponent } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
  withStyles,
  withTheme
} from '@material-ui/core';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  Avatar,
  Button,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  Enums,
  InputToolbox,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  Search,
  Sidebar
} from '@chatscope/chat-ui-kit-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCog, faEdit, faEllipsisV, faPaperPlane, faPaperclip, faQuoteLeft, faSmile, faTrash } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import faker from 'faker';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'redux';

import Header from '../components/Header';
import './Messenger.css';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },
  search: {
    margin: theme.spacing(1)
  },
  menuItem: {
    '&:hover > .MuiListItemIcon-root > .MuiBox-root > svg': {
      color: theme.palette.info.main
    },
    '&:hover > .MuiListItemText-root > .MuiTypography-root': {
      color: theme.palette.info.main
    }
  },
  menuIcon: {
    minWidth: 'unset',
    marginRight: theme.spacing(2)
  }
});

class Messenger extends PureComponent {
  state = {
    search: '',
    conversations: [],
    activeIndex: -1,
    currentConversation: {},
    messages: [],
    text: '',
    moreEl: null,
    moreId: '',
    dialogOpened: false,
    emojiEl: null,
    settingEl: null,
    enterMode: 'send'
  }

  componentDidMount() {
    const conversations = this.fetchConversations('');
    this.setState({
      conversations,
      activeIndex: 0,
      currentConversation: {
        ...conversations[0]
      },
      messages: this.fetchRecentMessages(conversations[0])
    });
  }

  fetchConversations(search) {
    const { StatusEnum } = Enums;
    const conversations = [];
    for (let i = 0; i < 20; i++) {
      const name = faker.name.findName();
      conversations.push({
        name,
        lastSender: faker.random.boolean() ? name : 'You',
        lastMessage: faker.lorem.sentence(),
        avatar: faker.image.image(),
        status: StatusEnum[faker.random.number({ min: 0, max: StatusEnum.length - 1 })],
        lastTime: faker.date.past(),
        unread: faker.random.number({ min: 0, max: 30 })
      });
    }
    if (!search) {
      return conversations;
    }
    return conversations.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }

  fetchRecentMessages({ name }) {
    const messages = [];
    for (let i = 0; i < 20; i++) {
      const direction = faker.random.boolean() ? 'incoming' : 'outgoing';
      messages.push({
        id: uuidv4(),
        text: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        modifiedAt: faker.random.boolean() ? faker.date.past() : undefined,
        sender: direction === 'incoming' ? name : 'You',
        direction
      });
    }
    this.fixPositionInMessages(messages);
    return messages;
  }

  fixPositionInMessages(messages) {
    if (messages.length === 0) {
      return;
    }
    if (messages.length === 1) {
      messages[0].position = 'single';
      return;
    }
    for (let i = 0; i < messages.length; i++) {
      if (i === 0) {
        messages[i].position = (messages[i].direction === messages[i + 1].direction) ? 'first' : 'single';
      } else if (i === messages.length - 1) {
        messages[i].position = (messages[i].direction === messages[i - 1].direction) ? 'last' : 'single';
      } else {
        if (messages[i].direction !== messages[i - 1].direction && messages[i].direction !== messages[i + 1].direction) {
          messages[i].position = 'single';
        } else if (messages[i].direction !== messages[i - 1].direction) {
          messages[i].position = 'first';
        } else if (messages[i].direction !== messages[i + 1].direction) {
          messages[i].position = 'last';
        } else {
          messages[i].position = 'normal';
        }
      }
    }
  }

  onOpenConversation(index) {
    this.setState({
      activeIndex: index,
      currentConversation: {
        ...this.state.conversations[index]
      },
      messages: this.fetchRecentMessages(this.state.conversations[index])
    });
  }

  onSearchConversation = (search) => {
    this.setState({
      search,
      conversations: this.fetchConversations(search),
      activeIndex: -1
    });
  }

  formaatLastTime(date) {
    const past = moment(date);
    const now = moment();
    if (now.diff(past, 'years') >= 1) {
      return past.format('MM/DD/YYYY'); // 12/25/2020
    }
    if (now.diff(past, 'days') >= 7) {
      return past.format('MM/DD'); // 12/25
    }
    if (now.diff(past, 'days') >= 2) {
      return past.format('dddd'); // Monday
    }
    if (now.diff(past, 'days') === 1) {
      return 'Yesterday';
    }
    return past.format('LT'); // 0:30 PM
  }

  onOpenMoreMenu = (e, id) => this.setState({
    moreEl: e.currentTarget,
    moreId: id
  })

  onCloseMoreMenu = () => this.setState({
    moreEl: null,
    moreId: ''
  })

  onOpenDialog = () => this.setState({ dialogOpened: true })

  onCloseDialog = () => this.setState({ dialogOpened: false })

  handleAttach = (e) => {
    console.log(e);
  }

  onOpenEmojiPopover = (event) => this.setState({ emojiEl: event.currentTarget })

  onCloseEmojiPopover = () => this.setState({ emojiEl: null })

  handleEmoji = (event, emojiObject) => {
    this.setState({
      text: this.state.text + emojiObject.emoji
    });
  }

  handleSend = () => {
    this.setState({ text: '' });
  }

  onOpenSettingPopover = (event) => this.setState({ settingEl: event.currentTarget })

  onCloseSettingPopover = () => this.setState({ settingEl: null })

  render = () => (
    <div className={this.props.classes.root}>
      <Header />
      <div style={{ height: 'calc(100% - 64px - 36px)' }}>
        <MainContainer responsive>
          <Sidebar position="left">
            <Search
              placeholder="Search..."
              value={this.state.search}
              onChange={this.onSearchConversation}
              onClearClick={() => this.onSearchConversation('')}
            />
            <ConversationList>
              {this.state.conversations.map(({ name, lastSender, lastMessage, avatar, status, lastTime, unread }, index) => (
                <Conversation
                  key={index}
                  name={name}
                  lastSenderName={lastSender}
                  info={lastMessage}
                  lastActivityTime={this.formaatLastTime(lastTime)}
                  unreadCnt={unread}
                  active={index === this.state.activeIndex}
                  onClick={() => this.onOpenConversation(index)}
                >
                  <Avatar src={avatar} name={name} status={status} />
                </Conversation>
              ))}
            </ConversationList>
          </Sidebar>
          <ChatContainer style={{ height: '100%' }}>
            <ConversationHeader>
              <ConversationHeader.Back />
              {this.state.activeIndex !== -1 && (
                <Avatar
                  src={this.state.currentConversation.avatar}
                  name={this.state.currentConversation.name}
                />
              )}
              {this.state.activeIndex !== -1 && (
                <ConversationHeader.Content
                  userName={this.state.currentConversation.name}
                  info={`Active ${moment(this.state.currentConversation.lastTime).fromNow()}`}
                />
              )}
            </ConversationHeader>
            <MessageList>
              {this.state.messages.map(({ id, text, createdAt, modifiedAt, sender, direction, position }, index) => (direction === 'incoming' && (position === 'single' || position === 'last')) ? (
                <Message key={index} model={{
                  sentTime: moment(createdAt).fromNow(),
                  sender,
                  direction,
                  position,
                  type: 'custom'
                }}>
                  <Avatar
                    src={this.state.currentConversation.avatar}
                    name={this.state.currentConversation.name}
                  />
                  <Message.CustomContent>
                    <Box>
                      <Box>
                        <span>{text}</span>
                        <Button className="msg-more-action" onClick={(e) => this.onOpenMoreMenu(e, id)} icon={(
                          <FontAwesomeIcon icon={faEllipsisV} />
                        )} />
                        {this.renderMoreMenu(id)}
                      </Box>
                      {modifiedAt && (
                        <Box>
                          <Tooltip title={`Edited on ${moment(modifiedAt).format('LLLL')}`}>
                            <Typography variant="body2" color="textSecondary">(edited)</Typography>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </Message.CustomContent>
                </Message>
              ) : (
                <Message key={index} avatarSpacer={direction === 'incoming'} model={{
                  sentTime: moment(createdAt).fromNow(),
                  sender,
                  direction,
                  position,
                  type: 'custom'
                }}>
                  <Message.CustomContent>
                    <Box>
                      <Box>
                        {direction === 'outgoing' && (
                          <Fragment>
                            <Button className="msg-more-action" onClick={(e) => this.onOpenMoreMenu(e, id)} icon={(
                              <FontAwesomeIcon icon={faEllipsisV} />
                            )} />
                            {this.renderMoreMenu(id)}
                          </Fragment>
                        )}
                        <span>{text}</span>
                        {direction === 'incoming' && (
                          <Fragment>
                            <Button className="msg-more-action" onClick={(e) => this.onOpenMoreMenu(e, id)} icon={(
                              <FontAwesomeIcon icon={faEllipsisV} />
                            )} />
                            {this.renderMoreMenu(id)}
                          </Fragment>
                        )}
                      </Box>
                      {modifiedAt && (
                        <Box>
                          <Tooltip title={`Edited on ${moment(modifiedAt).format('LLLL')}`}>
                            <Typography variant="body2" color="textSecondary" align={direction === 'outgoing' ? 'right' : 'left'}>(edited)</Typography>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </Message.CustomContent>
                </Message>
              ))}
            </MessageList>
            <InputToolbox>
              <input
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={this.handleAttach}
              />
              <label htmlFor="contained-button-file">
                <div className="cs-button" style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <FontAwesomeIcon icon={faPaperclip} />
                </div>
              </label>
              <Button onClick={this.onOpenEmojiPopover} icon={(
                <FontAwesomeIcon icon={faSmile} />
              )} />
              {this.renderEmojiPopover()}
              <MessageInput
                placeholder="Type message here"
                attachButton={false}
                sendButton={false}
                value={this.state.text}
                onChange={(text) => this.setState({ text })}
              />
              <Button onClick={this.handleSend} icon={(
                <FontAwesomeIcon icon={faPaperPlane} />
              )} />
              <Button onClick={this.onOpenSettingPopover} icon={(
                <FontAwesomeIcon icon={faCog} />
              )} />
              {this.renderSettingPopover()}
            </InputToolbox>
          </ChatContainer>
        </MainContainer>
        <Box mt={1} mb={1} justifyContent="center">
          <Typography variant="body2" color="textSecondary" align="center">&copy; 2020 Gotlancer, Inc. All rights reserved.</Typography>
        </Box>
      </div>
      {this.rnederDialog()}
    </div>
  )

  renderMoreMenu = (id) => (
    <Menu
      id={`${id}-more-menu`}
      anchorEl={this.state.moreEl}
      keepMounted
      open={this.state.moreId === id}
      onClose={this.onCloseMoreMenu}
      getContentAnchorEl={null} // menu should be display below anchor
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // menu should be display below anchor
    >
      <MenuItem onClick={() => {
        this.onCloseMoreMenu();
        this.onOpenDialog();
      }} className={this.props.classes.menuItem}>
        <ListItemIcon>
          <Box mr={1.5} width="100%" textAlign="center">
            <FontAwesomeIcon className={this.props.classes.menuIcon} icon={faTrash} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Delete" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem onClick={this.onCloseMoreMenu} className={this.props.classes.menuItem}>
        <ListItemIcon>
          <Box mr={1.5} width="100%" textAlign="center">
            <FontAwesomeIcon className={this.props.classes.menuIcon} icon={faEdit} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Edit" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
      <MenuItem onClick={this.onCloseMoreMenu} className={this.props.classes.menuItem}>
        <ListItemIcon>
          <Box mr={1.5} width="100%" textAlign="center">
            <FontAwesomeIcon className={this.props.classes.menuIcon} icon={faQuoteLeft} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Quote" primaryTypographyProps={{
          variant: 'body1',
          color: 'textPrimary'
        }} />
      </MenuItem>
    </Menu>
  )

  rnederDialog = () => (
    <Dialog
      open={this.state.dialogOpened}
      onClose={this.onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete message</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Are you sure to delete this message record?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.onCloseDialog} color="primary">No</Button>
        <Button onClick={this.onCloseDialog} color="primary" autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  )

  renderEmojiPopover = () => (
    <Popover
      id="emoji-menu"
      anchorEl={this.state.emojiEl}
      open={!!this.state.emojiEl}
      onClose={this.onCloseEmojiPopover}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Box width={this.props.theme.spacing(35)} m={2}>
        <EmojiPicker
          onEmojiClick={this.handleEmoji}
          disableAutoFocus
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: 'PEOPLE' }}
        />
      </Box>
    </Popover>
  )

  renderSettingPopover = () => (
    <Popover
      id="setting-menu"
      anchorEl={this.state.settingEl}
      open={!!this.state.settingEl}
      onClose={this.onCloseSettingPopover}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Box width={this.props.theme.spacing(30)} m={2}>
        <Box mb={1}>
          <Typography variant="body2">Pressing Enter Key will:</Typography>
        </Box>
        <MenuItem className={this.props.classes.menuItem} onClick={() => {
          this.setState({ enterMode: 'send' });
          this.onCloseSettingPopover();
        }}>
          <ListItemIcon className={this.props.classes.menuIcon}>
            <FontAwesomeIcon icon={faCheckCircle} color={this.state.enterMode === 'send' ? this.props.theme.palette.success.main : this.props.theme.palette.text.secondary} />
          </ListItemIcon>
          <ListItemText primary="Send a message" primaryTypographyProps={{
            variant: 'body1',
            style: {
              color: this.state.enterMode === 'send' ? this.props.theme.palette.success.main : this.props.theme.palette.text.primary
            }
          }} />
        </MenuItem>
        <MenuItem className={this.props.classes.menuItem} onClick={() => {
          this.setState({ enterMode: 'line-break' });
          this.onCloseSettingPopover();
        }}>
          <ListItemIcon className={this.props.classes.menuIcon}>
            <FontAwesomeIcon icon={faCheckCircle} color={this.state.enterMode === 'line-break' ? this.props.theme.palette.success.main : this.props.theme.palette.text.secondary} />
          </ListItemIcon>
          <ListItemText primary="Add a line break" primaryTypographyProps={{
            variant: 'body1',
            style: {
              color: this.state.enterMode === 'line-break' ? this.props.theme.palette.success.main : this.props.theme.palette.text.primary
            }
          }} />
        </MenuItem>
        <Box mt={1}>
          <Typography variant="body2">You can always use Shift+Enter or Ctrl+Enter to type multi-line messages.</Typography>
        </Box>
      </Box>
    </Popover>
  )
}

export default compose(
  withStyles(styles),
  withTheme
)(Messenger);