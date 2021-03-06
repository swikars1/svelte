import {
	SvelteComponentDev,
	add_location,
	append_dev,
	destroy_each,
	detach_dev,
	dispatch_dev,
	element,
	init,
	insert_dev,
	noop,
	safe_not_equal,
	set_data_dev,
	space,
	text
} from "svelte/internal";

const file = undefined;

function get_each_context(ctx, list, i) {
	const child_ctx = Object.create(ctx);
	child_ctx.thing = list[i];
	return child_ctx;
}

function create_each_block(ctx) {
	let span;
	let t0_value = ctx.thing.name + "";
	let t0;
	let t1;

	const block = {
		c: function create() {
			span = element("span");
			t0 = text(t0_value);
			t1 = space();

			{
				const { foo, bar, baz, thing } = ctx;
				console.log({ foo, bar, baz, thing });
				debugger;
			}

			add_location(span, file, 8, 1, 116);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t0);
			insert_dev(target, t1, anchor);
		},
		p: function update(changed, ctx) {
			if (changed.things && t0_value !== (t0_value = ctx.thing.name + "")) set_data_dev(t0, t0_value);

			if (changed.foo || changed.bar || changed.baz || changed.things) {
				const { foo, bar, baz, thing } = ctx;
				console.log({ foo, bar, baz, thing });
				debugger;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching) detach_dev(t1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(8:0) {#each things as thing}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let p;
	let t1;
	let t2;
	let each_value = ctx.things;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			p = element("p");
			t1 = text("foo: ");
			t2 = text(ctx.foo);
			add_location(p, file, 12, 0, 182);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, t0, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t1);
			append_dev(p, t2);
		},
		p: function update(changed, ctx) {
			if (changed.things) {
				each_value = ctx.things;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(changed, child_ctx);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t0.parentNode, t0);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (changed.foo) set_data_dev(t2, ctx.foo);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { things } = $$props;
	let { foo } = $$props;
	let { bar } = $$props;
	let { baz } = $$props;
	const writable_props = ["things", "foo", "bar", "baz"];

	Object.keys($$props).forEach(key => {
		if (!writable_props.includes(key) && !key.startsWith("$$")) console.warn(`<Component> was created with unknown prop '${key}'`);
	});

	$$self.$set = $$props => {
		if ("things" in $$props) $$invalidate("things", things = $$props.things);
		if ("foo" in $$props) $$invalidate("foo", foo = $$props.foo);
		if ("bar" in $$props) $$invalidate("bar", bar = $$props.bar);
		if ("baz" in $$props) $$invalidate("baz", baz = $$props.baz);
	};

	$$self.$capture_state = () => {
		return { things, foo, bar, baz };
	};

	$$self.$inject_state = $$props => {
		if ("things" in $$props) $$invalidate("things", things = $$props.things);
		if ("foo" in $$props) $$invalidate("foo", foo = $$props.foo);
		if ("bar" in $$props) $$invalidate("bar", bar = $$props.bar);
		if ("baz" in $$props) $$invalidate("baz", baz = $$props.baz);
	};

	return { things, foo, bar, baz };
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, ["things", "foo", "bar", "baz"]);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || ({});

		if (ctx.things === undefined && !("things" in props)) {
			console.warn("<Component> was created without expected prop 'things'");
		}

		if (ctx.foo === undefined && !("foo" in props)) {
			console.warn("<Component> was created without expected prop 'foo'");
		}

		if (ctx.bar === undefined && !("bar" in props)) {
			console.warn("<Component> was created without expected prop 'bar'");
		}

		if (ctx.baz === undefined && !("baz" in props)) {
			console.warn("<Component> was created without expected prop 'baz'");
		}
	}

	get things() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set things(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get foo() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set foo(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get bar() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set bar(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get baz() {
		throw new Error("<Component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set baz(value) {
		throw new Error("<Component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Component;