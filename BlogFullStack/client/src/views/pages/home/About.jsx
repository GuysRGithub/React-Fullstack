import React from "react";
import workSvg from "../../../assets/images/svg/working.svg";
import businessSvg from "../../../assets/images/svg/business_shop.svg";
import PageLayout from "../../layouts/PageLayout";

export default function () {

    return (<PageLayout>

            <section className="my-8">

                <section className="my-32 w-8/12 mx-auto">
                    <div className="flex">
                        <div className="w-6/12 mx-auto text-left">
                            <div className="flex items-center">
                                <span className="w-8 h-small bg-gray-500"/>
                                <p className="f6 ml-4 text-gray-500">About ECommer</p>
                            </div>

                            <h1 className="f3 font-bold font-josesans line-height-normal mt-2">We can provide varies
                                products
                                from digital
                                products to edge
                                tech products to scope with new demands and growing user base</h1>
                            <p className="mx-auto mt-4 f7">
                                Ecommer is company of multi national oneline shop including many high quality of new
                                brand
                                products including
                                digital products, applications that can satisfy the demands of the hardest customer
                            </p>

                            <div
                                className="block width-max px-8 py-2 mt-8 bg-white shadow-full rounded-full text-center f5 font-josesans color-fade cursor-pointer">
                                Get started<i className="ml-2 fa fa-credit-card mr-3 duration-500"/>
                            </div>
                        </div>
                        <div className="w-5/12">
                            <img src={workSvg} alt="work"/>
                        </div>

                    </div>

                </section>

                <section className="my-16 mx-auto w-8/12">
                    <div className="flex items-center justify-between">
                        <div className="w-5/12">
                            <img src={businessSvg} alt="business"/>
                        </div>
                        <div className="w-6/12">
                            <div className="flex items-center">
                                <span className="h-small w-8 bg-gray-500"/>
                                <h6 className="f6 ml-4 font-bold text-gray-500 text-uppercase">Start with us</h6>
                            </div>
                            <h3 className="f3 font-josesans font-bold line-height-normal">Is your site driving sales of
                                <span className="text-indigo-800">business</span></h3>
                            <p className="mx-auto mt-4 f7">
                                We provide excellent quality digital service with tangible results measurable long-term
                                business
                            </p>
                            <div
                                className="block width-max my-8 px-8 py-2 bg-white shadow-full rounded-full text-center f5 font-josesans color-fade cursor-pointer">
                                Start now <i className="ml-2 fa fa-clock mr-3 duration-500"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div>
                        <h1 className="f1 text-center font-bold font-josesans">About our company</h1>
                        <p className="w-1/2 mx-auto mt-4 text-center">
                            We provide simple, high quality and reasonable price products for worldwide market. Driven
                            by a
                            strong focus on
                            innovation and customer-centricity, Ecommer has quickly grown to serve over two millions
                            customers,
                            shoppers and
                            retainers on out platform
                        </p>
                    </div>
                    <div className="mx-16 my-16">
                        <img src={require("../../../assets/images/nature/sora-sagano-Dksk8szLRN0-unsplash.jpg").default}
                             alt=""
                             className="h-64 w-full object-cover rounded-extra-lg"/>
                    </div>
                </section>

                <section className="mx-16 my-16">
                    <div className="flex w-1/2 mx-auto">
                        <div>
                            <h6 className="f3 font-josesans text-center font-bold mt-8">Our features</h6>
                            <p className="f6">In the 21st century</p>
                        </div>
                        <div className="w-32 h-32 ml-8 rounded-extra-lg shadow-lg relative">
                            <div className="center-inner">
                                <i className="fas fa-dolly"/>
                                <p className="mt-2">Priority shipping</p>
                            </div>
                        </div>
                        <div className="w-32 h-32 ml-8 rounded-extra-lg shadow-full relative">
                            <div className="center-inner">
                                <i className="fas fa-balance-scale-left"/>
                                <p className="mt-2">Free Returns</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex w-1/2 mx-auto mt-4">
                        <div className="w-32 h-32 ml-4 rounded-extra-lg shadow-full relative">
                            <div className="center-inner">
                                <i className="fas fa-user-cog"/>
                                <p className="mt-2">In Home Setup</p>
                            </div>
                        </div>
                        <div className="w-32 h-32 ml-8 rounded-extra-lg shadow-full relative">
                            <div className="center-inner">
                                <i className="fas fa-highlighter"/>
                                <p className="mt-2">High quality</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div>
                        <h1 className="f1 text-center font-bold font-josesans">Endless possibilities products</h1>
                        <p className="w-1/2 mx-auto mt-4 text-center">
                            Ecommer was among the first market to launch virtual card technology, enabling seamless
                            integration
                            for merchants
                            while allowing out customers shop online and in-store with thousands of leading global
                            shoppers
                        </p>
                    </div>
                </section>

                <section className="my-16">
                    <div>
                        <h1 className="f1 text-center font-bold font-josesans">Our members</h1>
                        <p className="w-1/2 mx-auto mt-4 text-center">
                            Join us in the excellent quality business all over the world
                        </p>
                    </div>
                    <div className="flex w-2/3 mx-auto my-16 justify-center">

                        <div className="mx-4 text-center w-24">
                            <div className="w-24 h-24 rounded-circle overflow-hidden">
                                <img src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761__340.jpg"
                                     alt=""
                                     className="w-full h-full object-cover"/>
                            </div>
                            <h3 className="mt-4 font-bold font-josesans">Darrel Mary</h3>
                            <p className="mt-2 color-fade">Contact</p>
                        </div>

                        <div className="mx-4 text-center w-24">
                            <div className="w-24 h-24 rounded-circle overflow-hidden">
                                <img src="https://cdn.pixabay.com/photo/2017/09/25/13/12/man-2785071__480.jpg" alt=""
                                     className="w-full h-full object-cover"/>
                            </div>
                            <h3 className="mt-4 font-bold font-josesans">James Smith</h3>
                            <p className="mt-2 color-fade">Contact</p>
                        </div>

                        <div className="mx-4 text-center w-24">
                            <div className="w-24 h-24 rounded-circle overflow-hidden">
                                <img src="https://cdn.pixabay.com/photo/2016/02/19/10/56/man-1209494__480.jpg" alt=""
                                     className="w-full h-full object-cover"/>
                            </div>
                            <h3 className="mt-4 font-bold font-josesans">Patricia David</h3>
                            <p className="mt-2 color-fade">Contact</p>
                        </div>
                        <div className="mx-4 text-center w-24">
                            <div className="w-24 h-24 rounded-circle overflow-hidden">
                                <img src="https://cdn.pixabay.com/photo/2019/04/16/23/59/sad-4133121__480.jpg" alt=""
                                     className="w-full h-full object-cover"/>
                            </div>
                            <h3 className="mt-4 font-bold font-josesans">John Williams</h3>
                            <p className="mt-2 color-fade">Contact</p>
                        </div>
                        <div className="mx-4 text-center w-24">
                            <div className="w-24 h-24 rounded-circle overflow-hidden">
                                <img src="https://cdn.pixabay.com/photo/2020/03/20/18/52/fashion-4951644__480.jpg"
                                     alt=""
                                     className="w-full h-full object-cover"/>
                            </div>
                            <h3 className="mt-4 font-bold font-josesans">Robert Johnson</h3>
                            <p className="mt-2 color-fade">Contact</p>
                        </div>

                    </div>

                </section>

                <section>
                    <h1 className="f1 text-center font-bold font-josesans">Have something want to
                        buy <br/>Let <u>Shopping</u></h1>
                    <div
                        className="w-2/12 px-8 mt-8 py-2 bg-white shadow-full rounded-full mx-auto text-center f5 font-josesans color-fade cursor-pointer">
                        Shopping <i className="fa fa-shopping-bag mr-3 duration-500"/>
                    </div>
                </section>
            </section>
        </PageLayout>
    )
}
