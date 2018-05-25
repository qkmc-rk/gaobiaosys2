package xyz.ruankun.bean;

import java.util.List;

import xyz.ruankun.model.City;
import xyz.ruankun.model.County;
import xyz.ruankun.model.NameSec;
import xyz.ruankun.model.Province;
import xyz.ruankun.model.Town;
import xyz.ruankun.model.Village;

public class DeepNode<T> {

	/*
	 * initial data.
	 */
	private String name = "not initialed";
	
	private String code;
	private String role = "no privlege";
	
	private Integer id = -1;
	
	/**
	 * whthere spread the node.
	 */
	private boolean spread = true;
	
	private String href = "#";
	
	/**
	 * user's custom data. not use commonly.
	 */
	private T custom = null;
	
	private List<DeepNode<?>> children;

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public boolean isSpread() {
		return spread;
	}

	public void setSpread(boolean spread) {
		this.spread = spread;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public T getCustom() {
		return custom;
	}

	public void setCustom(T custom) {
		this.custom = custom;
	}

	public List<DeepNode<?>> getChildren() {
		return children;
	}

	public void setChildren(List<DeepNode<?>> children) {
		this.children = children;
	}
	
	public void setAll(Province p,T custom,List<DeepNode<?>> children) {
		if(p == null) return;
		this.name = p.getProname();
		this.code = p.getProcode();
		this.role = "province";
		this.id = p.getObjectid1();
		this.spread = true;
		this.custom = custom;
		this.children = children;
	}
	public void setAll(City c,T custom,List<DeepNode<?>> children) {
		if(c == null) return;
		this.name = c.getCityname();
		this.code = c.getCitycode();
		this.role = "city";
		this.id = c.getObjectid1();
		this.spread = true;
		this.custom = custom;
		this.children = children;
	}
	public void setAll(County c,T custom,List<DeepNode<?>> children) {
		if(c == null) return;
		this.name = c.getCouname();
		this.code = c.getCoucode();
		this.role = "county";
		this.id = c.getObjectid();
		this.spread = true;
		this.custom = custom;
		this.children = children;
	}
	public void setAll(NameSec nc,T custom,List<DeepNode<?>> children) {
		if(nc == null) return;
		this.name = nc.getNamsec();
		this.role = "namesec";
		this.id = nc.getObjectid();
		this.spread = true;
		this.custom = custom;
		this.children = children;
	}
	public void setAll(Town t,T custom,List<DeepNode<?>> children) {
		if(t == null) return;
		this.name = t.getTownname();
		this.code = t.getTowncode();
		this.role = "town";
		this.id = t.getObjectid();
		this.spread = true;
		this.custom = custom;
		this.children = children;
	}
	public void setAll(Village v,T custom,List<DeepNode<?>> children) {
		if(v == null) return;
		this.name = v.getVilname();
		this.code = v.getVilcode();
		this.role = "village";
		this.id = v.getObjectid();
		this.spread = true;
		this.custom = custom;
		this.children = children;
	}
}
