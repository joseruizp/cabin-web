package com.cabin.core.persistence.domain;

import org.springframework.security.core.authority.AuthorityUtils;

import com.cabin.core.enums.Role;

public class CurrentUser extends org.springframework.security.core.userdetails.User {

    private static final long serialVersionUID = 1L;

    private User user;

    public CurrentUser(User user) {
        super(user.getName(), user.getPass(), AuthorityUtils.createAuthorityList(Profile.getRole(user.getProfile().getId()).name()));
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return user.getId();
    }

    public String getUsername() {
        return user.getName();
    }

    public Role getRole() {
        return Profile.getRole(user.getProfile().getId());
    }
}
