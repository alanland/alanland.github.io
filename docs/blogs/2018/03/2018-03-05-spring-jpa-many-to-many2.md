---
title:  "SpringBoot Jpa Many-to-Many 2"
date:   2018-03-05 09:23:37 +0000
tags:   [springboot, jpa]
categories: [Java]
---

```scala
package com.bitbucket.alanland.weixin.user.domain

import javax.persistence._
import javax.validation.constraints.NotEmpty

import scala.annotation.meta.field
import scala.beans.BeanProperty

@Entity
class SysPermission(@(Id@field) @(GeneratedValue@field) @BeanProperty var id: Long,
                    @BeanProperty var resourceType: String, //资源类型，[menu|button]`
                    @BeanProperty @(NotEmpty@field) var permission: String, // //权限字符串,menu例子：role:*，button例子：role:create,role:update,role:delete,role:view
                    @BeanProperty @(NotEmpty@field) var name: String,
                    @BeanProperty var parentId: Long,
                    @BeanProperty var authorized: Int) {
    @ManyToMany
    @JoinTable(
      name = "SysRolePermission",
      joinColumns = Array(new JoinColumn(name = "permissionId")),
      inverseJoinColumns = Array(new JoinColumn(name = "roleId"))
    ) val roles: java.util.Set[SysRole] = null


//  import javax.persistence.OneToMany
//
//  @OneToMany(mappedBy = "permission")
//  val roles: java.util.Set[SysRolePermission] = null

  def this() = this(0, "", "", "", 0, 0)
}

object SysPermission {

  def menu(permission: String, name: String) = new SysPermission(0, "menu", permission, name, 0, 0)

  def button(permission: String, name: String) = new SysPermission(0, "button", permission, name, 0, 0)

}

```


```scala
package com.bitbucket.alanland.weixin.user.domain

import java.util
import javax.persistence._
import javax.validation.constraints.NotEmpty

import scala.annotation.meta.field
import scala.beans.BeanProperty


@Entity
class SysRole(@(Id@field) @(GeneratedValue@field) @BeanProperty var id: Long,
              @BeanProperty @(NotEmpty@field) var code: String,
              @BeanProperty @(NotEmpty@field) var name: String,
              @BeanProperty var deleted: Int) {

  //  角色 -- 权限关系：多对多关系;//角色 -- 权限关系：多对多关系;
  //  @ManyToMany(fetch = FetchType.EAGER)
  //  @JoinTable(
  //    name = "SysRolePermission",
  //    joinColumns = Array(new JoinColumn(name = "roleId")),
  //    inverseJoinColumns = Array(new JoinColumn(name = "permissionId"))
  //  ) var permissions: java.util.Set[SysPermission] = _

  import javax.persistence.OneToMany

  @OneToMany(mappedBy = "role")
  var permissions: java.util.Set[SysRolePermission] = new util.HashSet[SysRolePermission]()

  // 用户 - 角色关系定义;
  @ManyToMany
  @JoinTable(
    name = "SysUserRole",
    joinColumns = Array(new JoinColumn(name = "roleId")),
    inverseJoinColumns = Array(new JoinColumn(name = "userId"))
  )
  private var users: java.util.Set[SysUser] = _ // 一个角色对应多个用户

  def this() = this(0, null, null, 0)

  private def this(code: String, name: String) = this(0, code, name, 0)
}

object SysRole {
  def apply(code: String, name: String) = new SysRole(code, name)
}

```

```scala
package com.bitbucket.alanland.weixin.user.domain

import javax.persistence.{Column, Embeddable, Entity, Table}

@Embeddable class RolePermissionPK(@Column val roleId: Long,
                                   @Column val permissionId: Long) extends Serializable {

  import java.util.Objects

  override def equals(o: Any): Boolean = {
    //    if (this eq o) return true
    if (o == null || (getClass ne o.getClass)) return false
    val that = o.asInstanceOf[RolePermissionPK]
    Objects.equals(roleId, that.roleId) && Objects.equals(permissionId, that.permissionId)
  }

  override def hashCode: Int = Objects.hash(roleId.toString, permissionId.toString)
}

import javax.persistence.{EmbeddedId, ManyToOne, MapsId}

@Entity
@Table(name = " SysRolePermission") class SysRolePermission {
  @EmbeddedId
  private var id: RolePermissionPK = null

  @ManyToOne
  @MapsId("roleId")
  //  @JoinColumn(name = "roleId")
  private var role: SysRole = null

  @ManyToOne
  @MapsId("permissionId")
  //  @JoinColumn(name = "permissionId")
  private var permission: SysPermission = null

  import javax.persistence.Column

  @Column(name = "authorized") private val authorized = 0

  def this(role: SysRole, permission: SysPermission) = {
    this()
    this.role = role
    this.permission = permission
    this.id = new RolePermissionPK(role.id, permission.id)
  }
}
```

```scala
package com.bitbucket.alanland.weixin.user.domain

import java.util.UUID
import javax.persistence._
import javax.validation.constraints.NotEmpty

import scala.annotation.meta.field
import scala.beans.BeanProperty

@Entity
class SysUser(@(Id@field) @(GeneratedValue@field) @BeanProperty var id: Long,
              @BeanProperty @(NotEmpty@field) var username: String,
              @BeanProperty @(NotEmpty@field) var password: String,
              @BeanProperty @(NotEmpty@field) var salt: String,
              @BeanProperty var state: Int,
              @BeanProperty var deleted: Int) {
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "SysUserRole",
    joinColumns = Array(new JoinColumn(name = "userId")),
    inverseJoinColumns = Array(new JoinColumn(name = "roleId"))
  )
  var roles: java.util.Set[SysRole] = _

  def getCredentialsSalt: String = this.username + this.salt

  def this() = this(0, null, null, UUID.randomUUID().toString, 0, 0)

  private def this(username: String, password: String) = {
    this(0, username, password, UUID.randomUUID().toString, 0, 0)
  }
}

object SysUser {
  def apply(username: String, password: String): SysUser = new SysUser(username, password)
}
```
