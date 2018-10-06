import * as React from 'react';
import '../styles/bootstrap.css';
import '../App.css';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { configure, action, decorate } from 'mobx';

configure({ enforceActions: true });
class PagedList extends React.Component {

    componentDidMount() {
        const { VehicleMakeStore } = this.props;
        VehicleMakeStore.loadDataAsync();
        VehicleMakeStore.pageRedirect = false;

    }

    changePageNumber = (data) => {
        const { VehicleMakeStore } = this.props;
        let selected = data.selected;
        let offset = Math.ceil(selected + 1);
        VehicleMakeStore.vehicleMakeData.pageNumber = offset;
        VehicleMakeStore.loadDataAsync();
    }

    searchVehicleMake = (e) => {
        const { VehicleMakeStore } = this.props;
        if (e.key === "Enter") {
            VehicleMakeStore.search = e.target.value;
            VehicleMakeStore.loadDataAsync(VehicleMakeStore.vehicleMakeData.pageNumber = 1)
        }

        VehicleMakeStore.search = "";

    }

    sortVehicleMake = () => {
        const { VehicleMakeStore } = this.props;
        VehicleMakeStore.vehicleMakeData.isAscending = VehicleMakeStore.vehicleMakeData.isAscending ? false : true
        VehicleMakeStore.loadDataAsync()
    }

    render() {
        const { VehicleMakeStore } = this.props;
        return (
            <div>
                <br />

                <Link to="/VehicleMake/Create">Create New</Link>
                <br />
                <br />
                <div>
                    <input type="search" placeholder="Search" onKeyPress={this.searchVehicleMake} />
                </div>
                <br />
                <br />
                <input type="submit" value="Sort" onClick={this.sortVehicleMake} />
                <table className='table'>

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Abrv</th>
                            <th>Created By</th>

                        </tr>
                    </thead>
                    <tbody>
                        {VehicleMakeStore.vehicleMakeData.model.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.abrv}</td>
                                <td>{vehicle.createdBy}</td>
                                <td><Link to={`/VehicleMake/Edit/${vehicle.id}`}>Edit</Link> </td>
                                <td><Link to={`/VehicleMake/Delete/${vehicle.id}`}>Delete</Link> </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
                {VehicleMakeStore.status === "error" && <h3> Something went wrong</h3>}
                <ReactPaginate pageCount={Math.ceil(VehicleMakeStore.vehicleMakeData.totalCount / VehicleMakeStore.vehicleMakeData.pageSize)}
                    pageRangeDisplay={VehicleMakeStore.vehicleMakeData.pageSize}
                    onPageChange={this.changePageNumber}
                    marginPagesDisplayed={2}
                    containerClassName={"pagination"}
                    nextLabel={"next"}
                    previousLabel={"previous"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    nextClassName={"cursor"}
                    previousClassName={"cursor"}
                    pageClassName={"cursor"} />
            </div>

        )
    }

}
decorate(PagedList, {
    componentDidMount: action,

});

export default inject("VehicleMakeStore")(observer(PagedList));