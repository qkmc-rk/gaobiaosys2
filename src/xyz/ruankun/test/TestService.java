package xyz.ruankun.test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import xyz.ruankun.service.TreeService;

public class TestService {

	ApplicationContext ctx;
	@Before
	public void before() {
		ctx = new ClassPathXmlApplicationContext("classpath:root-context.xml");
	}
	
	@Test
	public void m1() {
		TreeService treeService = (TreeService)ctx.getBean("treeService");
		System.out.println(treeService.getFatherAndSelf("village", 7));
	}
}
