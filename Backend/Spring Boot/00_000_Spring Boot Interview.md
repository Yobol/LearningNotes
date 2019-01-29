# Spring Boot概览

[Spring Boot Github托管地址](https://github.com/spring-projects/spring-boot)

[Spring Boot官网](https://spring.io/projects/spring-boot)

## Spring Boot原则

**习惯优于配置**。通常一个软件项目中存在大量的配置，如数据库连接配置、服务器部署配置等，但是大多数配置都不需要修改任何数据，可以说是默认或者习惯的。因此，我们可以使用习惯性配置，使得开发者无需手动配置，加快搭建应用。

## Spring Boot特征

极大提高了开发、部署效率：

1. 使用Spring Boot只需很少的配置，大部分情况可以使用默认配置；快速搭建项目，可无配置整合主流第三方框架；
2. 可完全不使用xml配置，只使用自动配置（条件注解）和Java Config；
3. 提供starter简化Maven配置，当使用了spring-boot-starter-web时，会自动加入web相关的依赖；
4. 内嵌Servlet容器（可选择Tomcat、Jetty等），Spring Boot应用可以jar包的形式独立运行（可直接通过java -jar xxx.jar运行Spring Boot项目），无须以war包形式部署项目；
5. Spring Boot提供基于http、ssh、telnet对运行中的项目进行监控；
6. 集成云计算；

`注：Spring 4.x 和 Spring Boot都推荐使用Java Config，可以让开发者更理解自己配置的Bean。`